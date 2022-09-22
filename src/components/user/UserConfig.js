import { connect } from 'react-redux';
import { setStyle, saveStyle } from '../../app/appSlice';

import { Select } from '../layout/Input';

import styles from './styles/UserConfig.module.sass';
import language from '../../lang/lang.json';
import changeStyle from '../../app/themeStyles';


const UserConfig = ({ lang, uid, style, setStyle, saveStyle }) => {
  const onChange = (select) => {
    const [cat, value] = select.split('/');
    setStyle({ ...style, [cat]: value === 'default' ? null : value });
    changeStyle({ ...style, [cat]: value === 'default' ? null : value });
  }

  const onClick = () => saveStyle({uid: uid, style: style});

  return (
    <div className={styles.container}>
      <Select
        label={lang.labelThemeColor}
        onChange={(e) => onChange(e.target.value)}
        value={style.color ? `color/${style.color}` : 'color/default'}
      >
        <option value='color/default'>{lang.themeColor[0]}</option>
        <option value='color/light'>{lang.themeColor[1]}</option>
        <option value='color/dark'>{lang.themeColor[2]}</option>
        <option value='color/crazy'>{lang.themeColor[3]}</option>
      </Select>
      <Select
        label={lang.labelFontType}
        onChange={(e) => onChange(e.target.value)}
        value={style.ftype ? `ftype/${style.ftype}` : 'ftype/default'}
      >
        <option value='ftype/default'>{lang.fontType[0]}</option>
        <option value='ftype/Nabla'>{lang.fontType[1]}</option>
        <option value='ftype/Quicksand'>{lang.fontType[2]}</option>
        <option value='ftype/Inconsolata'>{lang.fontType[3]}</option>
        <option value='ftype/Josefin Sans'>{lang.fontType[4]}</option>
        <option value='ftype/Source Code Pro'>{lang.fontType[5]}</option>
      </Select>
      <Select
        label={lang.labelFontSize}
        onChange={(e) => onChange(e.target.value)}
        value={style.fsize ? `fsize/${style.fsize}` : 'fsize/default'}
      >
        <option value='fsize/default'>{lang.fontSize[0]}</option>
        <option value='fsize/small'>{lang.fontSize[1]}</option>
        <option value='fsize/large'>{lang.fontSize[2]}</option>
      </Select>
      <div className={styles.buttons}>
        <button onClick={() => onClick()}>{lang.buttonSave}</button>
      </div>
    </div>
  );
}

const mapState = (state) => ({
  lang: language[state.app.language].text,
  uid: state.app.user.uid,
  style: state.app.style
})

const mapDispatch = { setStyle, saveStyle }

export default connect(mapState, mapDispatch)(UserConfig);