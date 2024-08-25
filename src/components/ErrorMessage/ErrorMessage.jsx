import css from "./ErrorMessage.module.css";

const ErrorMessage = ({ errorMessage }) => {
  return (
    <div>
      <p className={css.errorMessage}>
        {errorMessage}. Please, try again later...
      </p>
    </div>
  );
};

export default ErrorMessage;
