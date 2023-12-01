import className from 'classnames';
import PropTypes from 'prop-types';
import { GoSync } from 'react-icons/go'
export default function Button({
  loading,
  children,
  primary,
  secondary,
  success,
  warning,
  danger,
  outline,
  rounded,
  ...rest
}) {
  const buttonClassName = className(
    rest.className,
    'flex items-center',
    'px-3',
    'py-1.5',
    'border',
    'h-8',
    {
      'opacity-80': loading,
      'border-blue-500 bg-blue-500 text-white': primary,
      'border-gray-900 bg-gray-900 text-gray': secondary,
      'border-green-500 bg-green-500 text-green': success,
      'border-yellow-400 bg-yellow-400 text-yellow': warning,
      'bg-red-500 border-red-500 text-red': danger,
      'rounded-full': rounded,
      'bg-white': outline,
      'text-blue-500': outline && primary,
      'text-gray-900': outline && secondary,
      'text-green-500': outline && success,
      'text-yellow4500': outline && warning,
      'text-red-500': outline && danger,
    }
  );

  return (
    <button {...rest} disabled={loading} className={buttonClassName}>
      {loading ? <GoSync className='animate-spin' /> : children}
    </button>
  );
}

Button.propTypes = {
  loading: PropTypes.bool,
  chilren: PropTypes.string,
  outline: PropTypes.bool,
  rounded: PropTypes.bool,
  checkVariationValue: ({ primary, secondary, success, warning, danger }) => {
    const count =
      Number(!!primary) +
      Number(!!secondary) +
      Number(!!success) +
      Number(!!warning) +
      Number(!!danger);
    if (count > 1) {
      return new Error(
        'Only one  primary, secondary, success, warning, danger can be true'
      );
    }
  },
};
