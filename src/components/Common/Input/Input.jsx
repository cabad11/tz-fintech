import classNames from 'classnames';
import React from 'react';
import styles from './Input.module.scss';

const Input = React.forwardRef(({
    onChange,
    placeholder,
    className,
    name,
    type,
    value,
    disabled
}, ref) => {
    return (<input type={type}
                   className={classNames(styles.input, className, { [styles.disabled]: disabled })}
                   placeholder={placeholder}
                   onChange={onChange}
                   name={name}
                   value={value}
                   ref={ref}/>);
});

export default React.memo(Input);