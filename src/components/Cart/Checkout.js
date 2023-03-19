import React, { useRef, useState } from "react";
import classes from "Checkout.module.css";

const isEmpty = (value) => value.trim() !== "";
const isNotFiveChars = (value) => value.trim().length === 5;

const CheckOut = (props) => {
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

    const enteredValidName = isEmpty(enteredName);
    const enteredValidStreet = isEmpty(enteredStreet);
    const enteredValidPostalCode = isEmpty(enteredPostalCode);
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

  const nameControlClasses = `${classes.control} ${
    formInputValidity.name ? "" : classes.inavlid
  }`;
  const streetControlClasses = `${classes.control} ${
    formInputValidity.street ? "" : classes.inavlid
  }`;
  const cityControlClasses = `${classes.control} ${
    formInputValidity.city ? "" : classes.inavlid
  }`;
  const postalCodeControlClasses = `${classes.control} ${
    formInputValidity.postalCode ? "" : classes.inavlid
  }`;

  return (
    <form className={classes.form} onSubmit={confirmHandler}>
      <div className={nameControlClasses}>
        <label htmlFor="name">Your Name</label>
        <input type="text" id="" ref={nameInputRef} />
        {!formInputValidity.name && <p>Please enter a valid name!</p>}
      </div>
      <div className={streetControlClasses}>
        <label htmlFor="">Street</label>
        <input type="text" id="" ref={streetInputRef} />
        {!formInputValidity.name && <p>Please enter a valid street!</p>}
      </div>
      <div className={postalCodeControlClasses}>
        <label htmlFor="">Postal Code</label>
        <input type="text" id="" ref={postalCodeInputRef} />
        {!formInputValidity.name && (
          <p>Please enter a valid posatl code (5 character long)!</p>
        )}
      </div>
      <div className={cityControlClasses}>
        <label htmlFor="">City</label>
        <input type="text" id="" ref={cityInputRef} />
        {!formInputValidity.name && <p>Please enter a valid city!</p>}
      </div>
      <div className={classes.actions}>
        <button type="button" onClick={props.OnCancel}>
          Cancel
        </button>
        <button className={classes.button}>Confirm</button>
      </div>
    </form>
  );
};

export default CheckOut;
