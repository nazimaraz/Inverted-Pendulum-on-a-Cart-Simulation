class PID {
    constructor(Kp = 0.0, Ki = 0.0, Kd = 0.0) {
        this.Kp = Kp;
        this.Ki = Ki;
        this.Kd = Kd;
        this.pError = 0.0;
        this.dError = 0.0;
        this.iError = 0.0;
        this.previousCTE = 0.0;
    }

    apply(desiredValue, existValue) {
        const error = desiredValue - existValue;
        this.pError = error;
        this.iError += error;
        this.dError = error - this.previousCTE;
        this.previousCTE = error;

        const { Kp, Ki, Kd } = this;
        return this.pError * Kp + this.iError * Ki + this.dError * Kd;
    }
}