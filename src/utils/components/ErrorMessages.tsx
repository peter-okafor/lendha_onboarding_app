interface ErrorData {
  [key: string]: string[];
}

const ErrorMessages = ({ errors }: { errors: ErrorData }) => {
  const errorMessages = getErrors(errors);

  if (errorMessages.length === 0) {
    return null;
  }

  return (
    <div>
      <ul>
        {errorMessages.map((message, index) => (
          <li key={index}>{message}</li>
        ))}
      </ul>
    </div>
  );
};

export default ErrorMessages;

export const getErrors = (errors: ErrorData): string[] => {
  const messages: string[] = [];

  Object.keys(errors).forEach((key) => {
    const keyErrors = errors[key];
    keyErrors.forEach((error) => {
      messages.push(error);
    });
  });

  return messages;
};
