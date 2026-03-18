import { useState, useRef, useCallback } from 'react';

const WORKER = 'https://connect-grow.pwriter455.workers.dev';
const POLL_INTERVAL_MS = 3000;
const MAX_POLL_ATTEMPTS = 20; // 60 seconds total

export type MpesaStatus = 'idle' | 'sending' | 'waiting' | 'success' | 'cancelled' | 'failed';

export interface MpesaState {
  status: MpesaStatus;
  message: string;
}

export function useMpesaPayment() {
  const [state, setState] = useState<MpesaState>({ status: 'idle', message: '' });
  const pollRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const attemptsRef = useRef(0);

  const stopPolling = useCallback(() => {
    if (pollRef.current !== null) {
      clearInterval(pollRef.current);
      pollRef.current = null;
    }
    attemptsRef.current = 0;
  }, []);

  const startPolling = useCallback((checkoutRequestId: string) => {
    attemptsRef.current = 0;

    pollRef.current = setInterval(async () => {
      attemptsRef.current += 1;

      try {
        const res = await fetch(`${WORKER}/api/mpesa/query`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ checkoutRequestId }),
        });
        const data = await res.json();

        if (data.status === 'success') {
          stopPolling();
          setState({ status: 'success', message: data.message });
          return;
        }

        if (data.status === 'cancelled') {
          stopPolling();
          setState({ status: 'cancelled', message: data.message });
          return;
        }

        if (data.status === 'timeout') {
          stopPolling();
          setState({ status: 'failed', message: data.message });
          return;
        }

        // Still pending — check max attempts
        if (attemptsRef.current >= MAX_POLL_ATTEMPTS) {
          stopPolling();
          setState({
            status: 'failed',
            message: 'Payment verification timed out. Contact us on WhatsApp if money was deducted.',
          });
        }
        // else keep polling
      } catch {
        if (attemptsRef.current >= MAX_POLL_ATTEMPTS) {
          stopPolling();
          setState({
            status: 'failed',
            message: 'Could not verify payment. Contact us if money was deducted.',
          });
        }
      }
    }, POLL_INTERVAL_MS);
  }, [stopPolling]);

  const pay = useCallback(async (phone: string, amount: number, description: string) => {
    stopPolling();
    setState({ status: 'sending', message: '' });

    try {
      const res = await fetch(`${WORKER}/api/mpesa/stkpush`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone, amount, description }),
      });
      const data = await res.json();

      if (data.success) {
        setState({ status: 'waiting', message: 'Check your phone and enter your M-Pesa PIN.' });
        startPolling(data.checkoutRequestId);
      } else {
        setState({ status: 'failed', message: data.error || 'Failed to send payment request.' });
      }
    } catch {
      setState({ status: 'failed', message: 'Could not connect. Please try again.' });
    }
  }, [stopPolling, startPolling]);

  const reset = useCallback(() => {
    stopPolling();
    setState({ status: 'idle', message: '' });
  }, [stopPolling]);

  return { ...state, pay, reset };
}
