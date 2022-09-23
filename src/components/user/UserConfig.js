import { useState, useEffect, useCallback, useMemo } from 'react';
import { connect } from 'react-redux';
import { saveStyle } from '../../app/appSlice';

import { Select } from '../layout/Input';

import styles from './styles/UserConfig.module.sass';
import language from '../../lang/lang.json';
import changeStyle from '../../app/themeStyles';


const UserConfig = ({ lang, uid, style, saveStyle }) => {
  const [temp, setTemp] = useState(style);
  const [saved, setSaved] = useState(false);

  const changeSelect = (select) => {
    const [cat, value] = select.split('/');
    if (saved) setSaved(false);
    setTemp({ ...temp, [cat]: value === 'default' ? null : value });
    changeStyle({ ...temp, [cat]: value === 'default' ? null : value });
  }

  const save = () => {
    if (!saved)
      saveStyle({ uid: uid, style: temp }).then((action) => {
        if (!action.error) setSaved(true);
      });
  }

  const memoSaved = useMemo(() => saved, [saved]);
  const memoStyle = useMemo(() => style, [style]);
  const unmount = useCallback(() => {
    if (!memoSaved) changeStyle(memoStyle);
  }, [memoSaved, memoStyle]);

  useEffect(() => {
    return () => unmount();
  }, [unmount]);

  return (
    <div className={styles.container}>
      <Select
        label={lang.labelThemeColor}
        onChange={(e) => changeSelect(e.target.value)}
        value={temp.color ? `color/${temp.color}` : 'color/default'}
      >
        <option value='color/default'>{lang.themeColor[0]}</option>
        <option value='color/light'>{lang.themeColor[1]}</option>
        <option value='color/dark'>{lang.themeColor[2]}</option>
        <option value='color/crazy'>{lang.themeColor[3]}</option>
      </Select>
      <Select
        label={lang.labelFontType}
        onChange={(e) => changeSelect(e.target.value)}
        value={temp.ftype ? `ftype/${temp.ftype}` : 'ftype/default'}
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
        onChange={(e) => changeSelect(e.target.value)}
        value={temp.fsize ? `fsize/${temp.fsize}` : 'fsize/default'}
      >
        <option value='fsize/default'>{lang.fontSize[0]}</option>
        <option value='fsize/small'>{lang.fontSize[1]}</option>
        <option value='fsize/large'>{lang.fontSize[2]}</option>
      </Select>
      <div className={styles.buttons}>
        <button onClick={() => save()}>{lang.buttonSave}</button>
      </div>
    </div>
  );
}

const mapState = (state) => ({
  lang: language[state.app.language].text,
  uid: state.app.user.uid,
  style: state.app.style
})

const mapDispatch = { saveStyle }

export default connect(mapState, mapDispatch)(UserConfig);