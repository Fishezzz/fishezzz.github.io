const bit = new BigNumber(1)
const byte = new BigNumber(8);
const units = {
    "byte": {
        "name": "Byte",
        "unit": "B",
        "factor": byte
    },
    "bit": {
        "name": "Bit",
        "unit": "bit",
        "factor": bit
    },
    "decimal_byte": [
        {
            "name": "Kilobyte",
            "unit": "kB",
            "factor": byte.multiply(1000)
        },
        {
            "name": "Megabyte",
            "unit": "MB",
            "factor": byte.multiply(1000).pow(2)
        },
        {
            "name": "Gigabyte",
            "unit": "GB",
            "factor": byte.multiply(1000).pow(3)
        },
        {
            "name": "Terabyte",
            "unit": "TB",
            "factor": byte.multiply(1000).pow(4)
        },
        {
            "name": "Petabyte",
            "unit": "PB",
            "factor": byte.multiply(1000).pow(5)
        },
        {
            "name": "Exabyte",
            "unit": "EB",
            "factor": byte.multiply(1000).pow(6)
        },
        {
            "name": "Zettabyte",
            "unit": "ZB",
            "factor": byte.multiply(1000).pow(7)
        },
        {
            "name": "Yottabyte",
            "unit": "YB",
            "factor": byte.multiply(1000).pow(8)
        }
    ],
    "decimal_bit": [
        {
            "name": "Kilobit",
            "unit": "kbit",
            "factor": bit.multiply(1000)
        },
        {
            "name": "Megabit",
            "unit": "Mbit",
            "factor": bit.multiply(1000).pow(2)
        },
        {
            "name": "Gigabit",
            "unit": "Gbit",
            "factor": bit.multiply(1000).pow(3)
        },
        {
            "name": "Terabit",
            "unit": "Tbit",
            "factor": bit.multiply(1000).pow(4)
        },
        {
            "name": "Petabit",
            "unit": "Pbit",
            "factor": bit.multiply(1000).pow(5)
        },
        {
            "name": "Exabit",
            "unit": "Ebit",
            "factor": bit.multiply(1000).pow(6)
        },
        {
            "name": "Zettabit",
            "unit": "Zbit",
            "factor": bit.multiply(1000).pow(7)
        },
        {
            "name": "Yottabit",
            "unit": "Ybit",
            "factor": bit.multiply(1000).pow(8)
        }
    ],
    "binary_byte": [
        {
            "name": "Kibibyte",
            "unit": "KiB",
            "factor": byte.multiply(1024)
        },
        {
            "name": "Mebibyte",
            "unit": "MiB",
            "factor": byte.multiply(1024).pow(2)
        },
        {
            "name": "Gibibyte",
            "unit": "GiB",
            "factor": byte.multiply(1024).pow(3)
        },
        {
            "name": "Tebibyte",
            "unit": "TiB",
            "factor": byte.multiply(1024).pow(4)
        },
        {
            "name": "Pebibyte",
            "unit": "PiB",
            "factor": byte.multiply(1024).pow(5)
        },
        {
            "name": "Exbibyte",
            "unit": "EiB",
            "factor": byte.multiply(1024).pow(6)
        },
        {
            "name": "Zebibyte",
            "unit": "ZiB",
            "factor": byte.multiply(1024).pow(7)
        },
        {
            "name": "Yobibyte",
            "unit": "YiB",
            "factor": byte.multiply(1024).pow(8)
        }
    ],
    "binary_bit": [
        {
            "name": "Kibibit",
            "unit": "Kibit",
            "factor": bit.multiply(1024)
        },
        {
            "name": "Mebibit",
            "unit": "Mibit",
            "factor": bit.multiply(1024).pow(2)
        },
        {
            "name": "Gibibit",
            "unit": "Gibit",
            "factor": bit.multiply(1024).pow(3)
        },
        {
            "name": "Tebibit",
            "unit": "Tibit",
            "factor": bit.multiply(1024).pow(4)
        },
        {
            "name": "Pebibit",
            "unit": "Pibit",
            "factor": bit.multiply(1024).pow(5)
        },
        {
            "name": "Exbibit",
            "unit": "Eibit",
            "factor": bit.multiply(1024).pow(6)
        },
        {
            "name": "Zebibit",
            "unit": "Zibit",
            "factor": bit.multiply(1024).pow(7)
        },
        {
            "name": "Yobibit",
            "unit": "Yibit",
            "factor": bit.multiply(1024).pow(8)
        }
    ]
};

let inputs = [];
let active_event = false;

let div_byte_bit = document.getElementsByClassName("container")[0];
let div_dec_byte = document.getElementsByClassName("decimal byte")[0];
let div_dec_bit = document.getElementsByClassName("decimal bit")[0];
let div_bin_byte = document.getElementsByClassName("binary byte")[0];
let div_bin_bit = document.getElementsByClassName("binary bit")[0];

addInputHTML(div_byte_bit, units.byte);
addInputHTML(div_byte_bit, units.bit);
units.decimal_byte.forEach(data => addInputHTML(div_dec_byte, data));
units.decimal_bit.forEach(data => addInputHTML(div_dec_bit, data));
units.binary_byte.forEach(data => addInputHTML(div_bin_byte, data));
units.binary_bit.forEach(data => addInputHTML(div_bin_bit, data));

function inputChanged(event) {
    if (active_event) {
        event.stopImmediatePropagation();
    } else {
        active_event = true;
        let bits = parseInt(event.target.value) * parseInt(event.target.getAttribute("factor"));
        inputs.forEach(input => {
            input.value = bits / parseInt(input.getAttribute("factor"))
        });
        active_event = false;
    }
}

function addInputHTML(parent, data) {
    let input = document.createElement("input");
    input.setAttribute("type", "number");
    input.setAttribute("name", data.unit);
    input.setAttribute("placeholder", data.unit);
    input.setAttribute("factor", data.factor);
    input.addEventListener("change", inputChanged);

    let div_input = document.createElement("div");
    div_input.setAttribute("class", "div-input");
    div_input.appendChild(input);

    let label = document.createElement("label");
    label.setAttribute("for", data.unitunit);
    label.appendChild(document.createTextNode(`${data.name} (${data.unit})`));

    let div_label = document.createElement("div");
    div_label.setAttribute("class", "div-label");
    div_label.appendChild(label);

    let div_unit = document.createElement("div");
    div_unit.setAttribute("class", "unit");
    div_unit.appendChild(div_label);
    div_unit.appendChild(div_input);

    parent.appendChild(div_unit);
    inputs.push(input);
}
