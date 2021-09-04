import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';

import billboard from '../ethereum/billboard';
import web3 from '../ethereum/web3';
import styles from './submit.module.css';

function Submit() {
  const [message, setMessage] = useState('');
  const [image, setImage] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const router = useRouter();
  useEffect(() => {
    router.prefetch('/');
  });

  const handleMessageChange = (event) => {
    event.preventDefault();

    setMessage(event.target.value);
  };

  const handleImageChange = (event) => {
    event.preventDefault();

    setImage(event.target.value);
  };

  const submitBillboard = async (event) => {
    event.preventDefault();

    setError('');
    setLoading(true);

    try {
      const accounts = await web3.eth.getAccounts();
      await billboard.methods.setBillboard(message, image).send({
        from: accounts[0],
        gas: '1000000',
      });

      setLoading(false);

      router.push('/');
    } catch (err) {
      setError(err.message);
    }
    setLoading(false);
  };

  return (
    <div>
      <Link href="/">
        Back to Homepage
      </Link>
      <form
        onSubmit={submitBillboard}
        className={styles.form}
      >
        <label
          htmlFor="message"
          className={styles.label}
        >
          Message
          <br />
          <textarea
            className={styles.input}
            rows="4"
            id="message"
            value={message}
            onChange={handleMessageChange}
          />
        </label>
        <br />
        <br />

        <label
          htmlFor="image"
          className={styles.label}
        >
          Image URL
          <br />
          <input
            className={styles.input}
            id="image"
            value={image}
            onChange={handleImageChange}
          />
        </label>

        <br />

        <button
          type="submit"
          className={styles.button}
        >
          <div className={loading ? styles.loader : ''} />
          Submit
        </button>

        <div
          hidden={!error}
          className={styles.error}
        >
          {error}
        </div>
      </form>
    </div>
  );
}

export default Submit;
