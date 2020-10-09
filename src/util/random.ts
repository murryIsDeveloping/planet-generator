export class NumberSeed {
    constructor(private value: string){}

    next(){
        let sum = 0;
    
        // convert seed to base64 help randomise chars
        // min max of chars in the unicode chars that use b64 chars
        const b64 = btoa(this.value),
            min = 32,
            max = 90,
            normalize = (val: number) => (val - min) / (max - min);
    
        // sum normalized numbers together
        for(let i = 0; i < b64.length; i++){
            let code = b64.charCodeAt(i);
            let normalised = code >= max ? 0.99999 : code <= min ? 0.00001 : normalize(code)
            sum += normalised;
        }
    
        // mod by one to give whatever is left over which will give a random num between 0 and 0.9999999999999
        // Will never return 1
        const dec = sum%1;
        const decAsString = dec.toString();
        this.value += decAsString[decAsString.length-1];
        return dec;
    }
}


// Same Function using a generator
export function* seedGenerator(value: string) {    
    const b64 = btoa(value),
        min = 32,
        max = 90,
        normalize = (val: number) => (val - min) / (max - min);

    let sum = 0;
    for(let i = 0; i < b64.length; i++){
        let code = b64.charCodeAt(i);
        let normalised = code >= max ? 0.99999 : code <= min ? 0.00001 : normalize(code)
        sum += normalised;
    }

    const dec = sum%1;
    yield dec;
    const decAsString = dec.toString();
    yield* seedGenerator(value + decAsString[decAsString.length-1]);
}