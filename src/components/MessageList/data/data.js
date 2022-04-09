 let regexp = /[a-z]/i
 let regexp2 = /[\[\]|?!;:+\\/^()}{"'.]/
export let messages = [
    {
        text:"Буквы должны быть лат. алфавита",
        regexp: regexp,
        result: true,
    },
    {
        text: "Имя должно содержать минимум одну букву",
        regexp: regexp,
        result: true,
    },
    {
        text:"Имя не должно содержать символы '[]\|?;:/^()'.}{! ",
        regexp: regexp2,
        result: false,
    }
];