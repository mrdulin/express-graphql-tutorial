type IResolve<T> = (value?: T | PromiseLike<T>) => void;
type IReject<T> = (reason?: any) => void;

interface IDeffer<T> {
  promise: Promise<T>;
  resolve: IResolve<T>;
  reject: IReject<T>;
}

function noop() {}

interface IListener<T> {
  [key: string]: Array<IDeffer<T>>;
}

class Pubsub {
  private listener: IListener<any> = {};
  private resolve: IResolve<any> = noop;
  private reject: IReject<any> = noop;

  public publish(channel: string, payload: any) {
    if (this.listener[channel]) {
      this.listener[channel].forEach((d: IDeffer<any>) => d.resolve(payload));
      delete this.listener[channel];
    }
  }

  public subscribe(channel: string): Promise<any> {
    const deffer: IDeffer<any> = this.createDeffer();
    if (!this.listener[channel]) {
      this.listener[channel] = [];
    }
    this.listener[channel].push(deffer);
    return deffer.promise;
  }

  private createDeffer(): IDeffer<any> {
    const deffer: IDeffer<any> = {
      promise: new Promise<any>((resolve: IResolve<any>, reject: IReject<any>) => {
        this.resolve = resolve;
        this.reject = reject;
      }),
      resolve: this.resolve,
      reject: this.reject
    };
    return deffer;
  }
}

export { Pubsub };
