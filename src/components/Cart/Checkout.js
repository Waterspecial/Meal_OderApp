import React, { useRef, useState } from "react";
import styles from "./Checkout.module.css";

const isEmpty = (value) => value.trim() === "";
const isNotFiveChars = (value) => value.trim().length === 5;

const Checkout = (props) => {
  const [formInputValidity, setFormInputValidity] = useState({
    name: true,
    street: true,
    postalCode: true,
    city: true,
  });

  const nameInputRef = useRef();
  const streetInputRef = useRef();
  const postalCodeInputRef = useRef();
  const cityInputRef = useRef();

  const confirmHandler = (event) => {
    event.preventDefault();

    const enteredName = nameInputRef.current.value;
    const enteredStreet = streetInputRef.current.value;
    const enteredPostalCode = postalCodeInputRef.current.value;
    const enteredCity = cityInputRef.current.value;

    const enteredValidName = !isEmpty(enteredName);
    const enteredValidStreet = !isEmpty(enteredStreet);
    const enteredValidPostalCode = !isEmpty(enteredPostalCode);
    const enteredValidCity = isNotFiveChars(enteredCity);

    setFormInputValidity({
      name: enteredValidName,
      street: enteredValidStreet,
      postalCode: enteredValidPostalCode,
      city: enteredValidCity,
    });

    const formIsValid =
      enteredValidName &&
      enteredValidStreet &&
      enteredValidPostalCode &&
      enteredValidCity;

    if (!formIsValid) {
      return;
    }
    props.onConfirm({
      name: enteredName,
      street: enteredStreet,
      postalCode: enteredPostalCode,
      city: enteredCity,
    });
  };

  const nameControlstyles = `${styles.control} ${
    formInputValidity.name ? "" : styles.inavlid
  }`;
  const streetControlstyles = `${styles.control} ${
    formInputValidity.street ? "" : styles.inavlid
  }`;
  const cityControlstyles = `${styles.control} ${
    formInputValidity.city ? "" : styles.inavlid
  }`;
  const postalCodeControlstyles = `${styles.control} ${
    formInputValidity.postalCode ? "" : styles.inavlid
  }`;

  return (
    <form className={styles.form} onSubmit={confirmHandler}>
      <div className={nameControlstyles}>
        <label htmlFor="name">Your Name</label>
        <input type="text" id="name" ref={nameInputRef} />
        {!formInputValidity.name && <p>Please enter a valid name!</p>}
      </div>
      <div className={streetControlstyles}>
        <label htmlFor="">Street</label>
        <input type="text" id="street" ref={streetInputRef} />
        {!formInputValidity.street && <p>Please enter a valid street!</p>}
      </div>
      <div className={postalCodeControlstyles}>
        <label htmlFor="">Postal Code</label>
        <input type="text" id="postal" ref={postalCodeInputRef} />
        {!formInputValidity.postalCode && (
          <p>Please enter a valid posatl code (5 character long)!</p>
        )}
      </div>
      <div className={cityControlstyles}>
        <label htmlFor="">City</label>
        <input type="text" id="city" ref={cityInputRef} />
        {!formInputValidity.city && <p>Please enter a valid city!</p>}
      </div>
      <div className={styles.actions}>
        <button type="button" onClick={props.onCancel}>
          Cancel
        </button>
        <button className={styles.button}>Confirm</button>
      </div>
    </form>
  );
};

export default Checkout;
