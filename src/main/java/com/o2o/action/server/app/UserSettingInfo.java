package com.o2o.action.server.app;

import java.io.Serializable;

public class UserSettingInfo implements Serializable {
    // 배경음
    private boolean BackGroundSound;
    // 효과음
    private boolean SoundEffect;

    public UserSettingInfo()
    {
        BackGroundSound = true;
        SoundEffect = true;
    }
    public void setBackGroundSound(String sound, int onoff) {
        System.out.println("sound : " + sound + "onoff : " + onoff);
        boolean isonoff = onoff==1? true:false;
        if(sound.equals("BackGround"))
        {
            BackGroundSound = isonoff;
        }
        else if(sound.equals("SoundEffect"))
        {
            SoundEffect = isonoff;
        }
        else
        {
            System.out.println("Sound의 종류가 다릅니다");
        }
    }

    public void setSoundEffect(boolean soundEffect) {
        SoundEffect = soundEffect;
    }
    public boolean isBackGroundSound() {
        return BackGroundSound;
    }

    public boolean isSoundEffect() {
        return SoundEffect;
    }
}
