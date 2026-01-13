interface Props {
  className?: string;
}

const LinkedIn = ({ className }: Props): JSX.Element => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22ZM7.5 9.5C8.32843 9.5 9 8.82843 9 8C9 7.17157 8.32843 6.5 7.5 6.5C6.67157 6.5 6 7.17157 6 8C6 8.82843 6.67157 9.5 7.5 9.5ZM9 10.5H6V17.5H9V10.5ZM10.5 10.5H13.5V11.75C13.9 11.1 14.8 10.25 16.25 10.25C18.1 10.25 18.5 11.5 18.5 13.75V17.5H15.5V14.25C15.5 13.25 15.25 12.5 14.25 12.5C13.25 12.5 13 13.25 13 14V17.5H10.5V10.5Z"
      fill="currentColor"
    />
  </svg>
);

export default LinkedIn;
