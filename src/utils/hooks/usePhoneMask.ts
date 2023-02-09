import { useEffect, useState } from 'react';

export default function usePhoneMask(phone: string) {
  const [maskedPhone, setMaskedPhone] = useState('');

  useEffect(() => {
    const regex = /^(\d{3})(\d{3})(\d{4})$/;

    setMaskedPhone(phone.replace(regex, '$1$2$3'));
  }, [phone]);

  return maskedPhone;
}

export function usePhoneMaskWith11Digits(phone: string) {
  const [maskedPhone, setMaskedPhone] = useState('');

  useEffect(() => {
    const regex = /^(\d{4})(\d{3})(\d{4})$/;

    setMaskedPhone(phone.replace(regex, '$1$2$3'));
  }, [phone]);

  return maskedPhone;
}
