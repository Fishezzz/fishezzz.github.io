const one = new BigNumber(1)
const units = {
    "byte": {
        "name": "Byte",
        "unit": "B",
        "factor": 8
    },
    "bit": {
        "name": "Bit",
        "unit": "bit",
        "factor": 1
    },
    "decimal_byte": [
        {
            "name": "Kilobyte",
            "unit": "kB",
            "factor": one.multiply(1000).multiply(8)
        },
        {
            "name": "Megabyte",
            "unit": "MB",
            "factor": one.multiply(1000).pow(2).multiply(8)
        },
        {
            "name": "Gigabyte",
            "unit": "GB",
            "factor": one.multiply(1000).pow(3).multiply(8)
        },
        {
            "name": "Terabyte",
            "unit": "TB",
            "factor": one.multiply(1000).pow(4).multiply(8)
        },
        {
            "name": "Petabyte",
            "unit": "PB",
            "factor": one.multiply(1000).pow(5).multiply(8)
        },
        {
            "name": "Exabyte",
            "unit": "EB",
            "factor": one.multiply(1000).pow(6).multiply(8)
        },
        {
            "name": "Zettabyte",
            "unit": "ZB",
            "factor": one.multiply(1000).pow(7).multiply(8)
        },
        {
            "name": "Yottabyte",
            "unit": "YB",
            "factor": one.multiply(1000).pow(8).multiply(8)
        }
    ],
    "decimal_bit": [
        {
            "name": "Kilobit",
            "unit": "kbit",
            "factor": one.multiply(1000)
        },
        {
            "name": "Megabit",
            "unit": "Mbit",
            "factor": one.multiply(1000).pow(2)
        },
        {
            "name": "Gigabit",
            "unit": "Gbit",
            "factor": one.multiply(1000).pow(3)
        },
        {
            "name": "Terabit",
            "unit": "Tbit",
            "factor": one.multiply(1000).pow(4)
        },
        {
            "name": "Petabit",
            "unit": "Pbit",
            "factor": one.multiply(1000).pow(5)
        },
        {
            "name": "Exabit",
            "unit": "Ebit",
            "factor": one.multiply(1000).pow(6)
        },
        {
            "name": "Zettabit",
            "unit": "Zbit",
            "factor": one.multiply(1000).pow(7)
        },
        {
            "name": "Yottabit",
            "unit": "Ybit",
            "factor": one.multiply(1000).pow(8)
        }
    ],
    "binary_byte": [
        {
            "name": "Kibibyte",
            "unit": "KiB",
            "factor": one.multiply(1024).multiply(8)
        },
        {
            "name": "Mebibyte",
            "unit": "MiB",
            "factor": one.multiply(1024).pow(2).multiply(8)
        },
        {
            "name": "Gibibyte",
            "unit": "GiB",
            "factor": one.multiply(1024).pow(3).multiply(8)
        },
        {
            "name": "Tebibyte",
            "unit": "TiB",
            "factor": one.multiply(1024).pow(4).multiply(8)
        },
        {
            "name": "Pebibyte",
            "unit": "PiB",
            "factor": one.multiply(1024).pow(5).multiply(8)
        },
        {
            "name": "Exbibyte",
            "unit": "EiB",
            "factor": one.multiply(1024).pow(6).multiply(8)
        },
        {
            "name": "Zebibyte",
            "unit": "ZiB",
            "factor": one.multiply(1024).pow(7).multiply(8)
        },
        {
            "name": "Yobibyte",
            "unit": "YiB",
            "factor": one.multiply(1024).pow(8).multiply(8)
        }
    ],
    "binary_bit": [
        {
            "name": "Kibibit",
            "unit": "Kibit",
            "factor": one.multiply(1024)
        },
        {
            "name": "Mebibit",
            "unit": "Mibit",
            "factor": one.multiply(1024).pow(2)
        },
        {
            "name": "Gibibit",
            "unit": "Gibit",
            "factor": one.multiply(1024).pow(3)
        },
        {
            "name": "Tebibit",
            "unit": "Tibit",
            "factor": one.multiply(1024).pow(4)
        },
        {
            "name": "Pebibit",
            "unit": "Pibit",
            "factor": one.multiply(1024).pow(5)
        },
        {
            "name": "Exbibit",
            "unit": "Eibit",
            "factor": one.multiply(1024).pow(6)
        },
        {
            "name": "Zebibit",
            "unit": "Zibit",
            "factor": one.multiply(1024).pow(7)
        },
        {
            "name": "Yobibit",
            "unit": "Yibit",
            "factor": one.multiply(1024).pow(8)
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
        let bits = parseFloat(event.target.value) * parseInt(event.target.getAttribute("factor"));
        inputs.forEach(input => {
            if (input !== event.target) {
                input.value = bits / parseInt(input.getAttribute("factor"));
            }
        });
        active_event = false;
    }
}

function addInputHTML(parent, data) {
    let input = document.createElement("input");
    input.setAttribute("type", "number");
    input.setAttribute("step", "any");
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
