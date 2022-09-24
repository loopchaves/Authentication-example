import * as Yup from 'yup';
import { connect } from 'react-redux';
import { sendFeedback } from '../../app/appSlice';

import { TextArea } from './Input';
import FormBase from './FormBase';

import language from '../../lang/lang.json';


const WriteFeedback = ({ lang, uid, name, sendFeedback, handlerNewFeedback }) => {
  const validationSchema = Yup.object({
    feedback: Yup.string().required(lang.inputError.required)
  });

  const submit = (values, resetForm) => {
    sendFeedback({ ...values, uid: uid, name: name }).then((action) => {
      if (action.payload) {
        resetForm();
        handlerNewFeedback(action.payload);
      }
    });
  }

  return (
    <FormBase
      initialValues={{ feedback: '' }}
      validationSchema={validationSchema}
      onSubmit={submit}
      buttonSubmit={lang.text.buttonSendFeedback}
    >
      <TextArea label={lang.text.labelWriteFeedback} name='feedback' />
    </FormBase>
  );
}

const mapState = (state) => ({
  lang: language[state.app.language],
  uid: state.app.user.uid,
  name: state.app.user.name
})

const mapDispatch = { sendFeedback }

export default connect(mapState, mapDispatch)(WriteFeedback);