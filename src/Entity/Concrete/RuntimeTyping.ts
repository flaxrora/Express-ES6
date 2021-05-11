import CustomError from '../CustomError';
import { PathReporter } from 'io-ts/PathReporter';
import * as t from 'io-ts';

export class TypeError extends CustomError {
    constructor(Message: any) {
        super(Message);
        this.Name = 'TypeError';
        this.Status = 400;
        this.Message = Message;
    }
}

export class TypeChecker {
    static Check: Function = (Abstract: t.TypeC<any>, Object: any) => {
        const _result = PathReporter.report(Abstract.decode(Object));
        if (_result[0] !== 'No errors!') throw new TypeError(_result);
    }
}
