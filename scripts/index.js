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
    classNames: {
        regex: /\s[A-Z]\w*/g
    },
    punctuationSoft: {
        regex: /[[\](){}:]+|(?<!&\w*);/g
    },
    punctuationHard: {
        regex: /[\+\*!|?]|(&gt;|&lt;|&amp;)|\B=\B|=(?!")/g
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
    keyTermsHard: {
        regex: /\b(if|then|else|for|while|do|class|function|return|in|of|new|this|try|catch|const|let|var)\b/gi
    },
    keyTermsSoft: {
        regex: /\b(true|false|null|nil|class|implements|extends|end|void|return|in|of|new|this|try|catch|def|except)\b/gi
    }
}

highlightJS.forEach(sample => {
    const parseString = sample.innerText;
    parseString.innerHTML = sample.innerHTML;

    new Set(parseString.match(generalSyntaxRules.strings.regex))
        .forEach(match => {
            sample.innerHTML = sample.innerHTML.replaceAll(match,
                `<span class="sh-string">$&</span>`);
        });

    new Set(parseString.match(generalSyntaxRules.keyTermsHard.regex))
        .forEach(match => {
            sample.innerHTML = sample.innerHTML.replaceAll(new RegExp(`\\b(${match})\\b`, 'g'),
                `<span class="sh-hard">$&</span>`);
        });

    new Set(parseString.match(generalSyntaxRules.classNames.regex))
        .forEach(match => {
            console.log(match)
            sample.innerHTML = sample.innerHTML.replaceAll(match,
                `<span class="sh-class">$&</span>`);
        })

    new Set(parseString.match(generalSyntaxRules.functions.regex))
        .forEach(match => {
            sample.innerHTML = sample.innerHTML.replaceAll(match,
                `<span class="sh-fn">${match.slice(0, -1)}</span>(`);
        });

    sample.innerHTML = sample.innerHTML.replaceAll(generalSyntaxRules.punctuationHard.regex,
        `<span class="sh-hard">$&</span>`);

    sample.innerHTML = sample.innerHTML.replaceAll(generalSyntaxRules.punctuationSoft.regex,
        `<span class="sh-soft">$&</span>`);
});