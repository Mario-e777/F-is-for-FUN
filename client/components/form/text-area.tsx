export default function TextArea({ placeHolder, state, setState, label, required, keyField, className }
  : {
    placeHolder: string;
    state: any;
    setState: any;
    label: string;
    keyField: string;
    required?: boolean;
    className?: string;
}) {
  const handleTextAreaText = event => {
    setState({
      ...state,
      fundraiserData: {
        ...state.fundraiserData,
        [keyField.replace(' ', '')]: event.target.value
      }
    })
  }

  return (
    <label className='description-container' >
      <p>{label} {required && <span>*</span>}</p>
      <textarea onChange={e => handleTextAreaText(e)} placeholder={placeHolder} />
    </label>
  )
}
