package com.o2o.action.server.app;

import java.io.Serializable;

public class UserSettingInfo implements Serializable {
    // 배경음
    private int BackGroundSound;
    // 효과음
    private int SoundEffect;

    public UserSettingInfo()
    {
        BackGroundSound = 1;
        SoundEffect = 1;
    }
    public void setBackGroundSound( int onoff) {
            BackGroundSound= onoff;
    }

    public void setSoundEffect(int onoff) {
        SoundEffect = onoff;
    }
    public int isBackGroundSound() {
        return BackGroundSound;
    }

    public int isSoundEffect() {
        return SoundEffect;
    }
}
