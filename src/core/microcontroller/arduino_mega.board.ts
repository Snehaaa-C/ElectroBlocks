import { MicroController, MicroControllerType } from "./microcontroller";

const arduinoMega: MicroController = {
  analonPins: [
    "A0",
    "A1",
    "A2",
    "A3",
    "A4",
    "A5",
    "A6",
    "A7",
    "A8",
    "A9",
    "A10",
    "A11",
    "A12",
    "A13",
    "A14",
    "A15",
  ],
  digitalPins: [
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "10",
    "11",
    "12",
    "13",
    "14",
    "15",
    "16",
    "17",
    "18",
    "19",
    "20",
    "21",
    "22",
    "22",
    "23",
    "24",
    "25",
    "26",
    "27",
    "28",
    "29",
    "30",
    "31",
    "32",
    "33",
    "34",
    "35",
    "36",
    "37",
    "38",
    "39",
    "40",
    "41",
    "42",
    "43",
    "44",
    "45",
    "46",
    "47",
    "48",
    "49",
    "50",
    "51",
    "52",
    "53",
    "A0",
    "A1",
    "A2",
    "A3",
    "A4",
    "A5",
    "A6",
    "A7",
    "A8",
    "A9",
    "A10",
    "A11",
    "A12",
    "A13",
    "A14",
    "A15",
  ],
  misoPins: ["50"],
  mosiPins: ["51"],
  pwmPins: [
    "4",
    "6",
    "7",
    "8",
    "9",
    "10",
    "11",
    "12",
    "13",
    "46",
    "45",
    "44",
    "A0",
    "A1",
    "A2",
    "A3",
    "A4",
    "A5",
    "A6",
    "A7",
    "A8",
    "A9",
    "A10",
    "A11",
    "A12",
    "A13",
    "A14",
    "A15",
  ],
  sckPins: ["52"],
  ssPins: ["53"],
  sclPins: ["21"],
  sdaPins: ["20"],
  serial_baud_rate: 115200,
  type: MicroControllerType.ARDUINO_UNO,
};

export default arduinoMega;
