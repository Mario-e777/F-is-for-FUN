export default function Input({ placeHolder, type, state, setState, label, required, keyField, className }
  : {
    placeHolder: string;
    type: string;
    state: any;
    setState: any;
    label: string;
    keyField: string;
    required?: boolean;
    className?: string;
}) {
  const handleInputText = event => {

    setState({
      ...state,
      fundraiserData: {
        ...state.fundraiserData,
        [keyField.replace(' ', '')]: event.target.value
      }
    })
  }

  return (
    <label className={className} >
      <p>{label} {required && <span>*</span>}</p>
      <input onChange={e => handleInputText(e)} placeholder={placeHolder} type={type} />
    </label>
  )
}
