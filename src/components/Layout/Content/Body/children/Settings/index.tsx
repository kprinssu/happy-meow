import React from 'react';

import { useAppDispatch } from '../../../../../../hooks';
import { setKeyboardProfile } from '../../../../../../store/keyboardSettings/actions';

export default () => {
  const dispatch = useAppDispatch();

  const loadProfile =  async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) {
      return;
    }

    dispatch(setKeyboardProfile(file.path));
  };

  return (
    <div className="content-body ml-1">
      <h1 className="text-lg">Settings</h1>
      <div className="settings">
        <div className="settings-item">
          <h2>Load Profile</h2>
          <span className="text-sm">Please use the following file selector to load any custom profile JSON (such as the ones from Angry Miao).</span>
          <br />
          <input id="profile-selector" type="file" className="text-sm" onChange={loadProfile} />

        </div>
      </div>
    </div>
  );
};
