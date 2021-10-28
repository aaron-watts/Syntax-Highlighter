const highlightJS = document.querySelectorAll('pre.syntax-highlighted.js');

const generalSyntaxRules = {
    strings: {
        type: 'string',
        regex: /"(?:[^"\\]|\\.)*"|('(?:[^'\\]|\\.)*')|`(?:[^`\\]|\\.)*`/g,
    },
    comments: {
        type: 'comment',
        regex: [
            /(?:^|[^\\])(\/\/.*)$/gm,
            /\/\*[\s\S]*?\*\//g,
            /\/\*\*[\s\S]*?\*\//g,
        ]
    },
    punctuation: {
        type: 'punctuation',
        regex: [
            /[[\](){}<>]+/g,
            /[\b\s]([$&|~*:;]+)[\b\s]/g,
        ]
    },
    number: {
        type: 'number',
        regex: [
            /[\b\W](-?((?:\d+\.\d+|\.\d+|\d+\.)(?:e[+-]?\d+)?)|\d+(?:e[+-]?\d+))/gi,
            /[\b\W](-?\d+)(?!\.)\b/g,
            /[\b\W](-?0x[A-F0-9]+)\b/gi,
        ]
    },
    functions: {
        regex: /\b([\w]+)\s*\(/gm
    },
    methods: {
        regex: /\.([\w]+)\s*\(/gm
    },
    fn: {
        type: 'function',
        regex: [
            /\b([\w]+)\s*\(/gm,
            /\.([\w]+)\s*\(/gm,
        ]
    },
    keyTermsHard: {
        regex: /\b(if|then|else|for|while|do|class|function|return|in|of|new|this|try|catch|const|let|var)\b/gi
    },
    keyTermsSoft: {
        regex: /\b(true|false|null|nil|class|implements|extends|end|void|return|in|of|new|this|try|catch|def|except)\b/gi
    }
}


const myfunc = () => {
    //example
}

function yo() {
    if (x == !true)
        return true;
}

const array = [];

highlightJS.forEach(sample => {
    let string = sample.innerHTML;
    const parse = document.createElement('pre');
    parse.innerHTML = sample.innerHTML;
    // string = string.replaceAll(
    //     //regex
    //     /('(?:[^'\\]|\\.)*')/g,
    //     '<span style="color:green;">HHH</span>'
    // );

    // const quotes = string.match(/('(?:[^'\\]|\\.)*')/g);
    // console.log(quotes);
    // for (let match of string.match(/('(?:[^'\\]|\\.)*')/g)) {
    //     console.log(match)
    // }

    parse.innerText.match(generalSyntaxRules.keyTermsHard.regex)
        .forEach(match => {
            parse.innerHTML = parse.innerHTML.replace(match,
                `<span class="sh-hard">$&</span>`);
        });

    parse.innerText.match(generalSyntaxRules.strings.regex)
        .forEach(match => {
            parse.innerHTML = parse.innerHTML.replace(match,
                `<span class="sh-string">$&</span>`);
        });

    parse.innerText.match(generalSyntaxRules.keyTermsHard.regex)
        .forEach(match => {
            parse.innerHTML = parse.innerHTML.replace(match,
                `<span class="sh-hard">$&</span>`);
        });

    parse.innerText.match(generalSyntaxRules.functions.regex)
        .forEach(match => {
            console.log(match)
            parse.innerHTML = parse.innerHTML.replace(match,
                `<span class="sh-fn">${match.slice(0,-1)}</span>(`);
        });

    

    // parse.innerHTML = parse.innerHTML.replaceAll(/\b([\w]+)\s*\(/gm,
    //     `<span class="sh-fn">$1</span>(`);

    // string = string.replaceAll(/\.([\w]+)\s*\(/gm,
    //     `.<span class="sh-fn">$2</span>(`);

    sample.innerHTML = parse.innerHTML;
})