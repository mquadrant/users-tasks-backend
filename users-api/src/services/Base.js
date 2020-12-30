export default class BaseService {
    constructor(args){
        if(!args.context) throw new Error('CONTEXT REQUIRED')
        this.context = args.context;
    }
    run(params) {
        return this.validate(params).then(cleanParams => {
            return this.execute(cleanParams)
        })
    }
}