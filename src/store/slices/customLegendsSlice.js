import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    legends: [
        { id: 'football-1', name: 'Lionel Messi (Argentina)', category: 'Football (Soccer)' },
        { id: 'football-2', name: 'Cristiano Ronaldo (Portugal)', category: 'Football (Soccer)' },
        { id: 'football-3', name: 'Pelé (Brazil)', category: 'Football (Soccer)' },
        { id: 'football-4', name: 'Diego Maradona (Argentina)', category: 'Football (Soccer)' },
        { id: 'football-5', name: 'Zinedine Zidane (France)', category: 'Football (Soccer)' },
        { id: 'football-6', name: 'Marta (Brazil)', category: 'Football (Soccer)' },
        { id: 'football-7', name: 'Neymar Jr. (Brazil)', category: 'Football (Soccer)' },
        { id: 'football-8', name: 'Kylian Mbappé (France)', category: 'Football (Soccer)' },
        { id: 'football-9', name: 'Ronaldinho (Brazil)', category: 'Football (Soccer)' },
        { id: 'football-10', name: 'David Beckham (England)', category: 'Football (Soccer)' },
        { id: 'football-11', name: 'Luka Modrić (Croatia)', category: 'Football (Soccer)' },
        { id: 'football-12', name: 'Robert Lewandowski (Poland)', category: 'Football (Soccer)' },
        { id: 'football-13', name: 'Andrés Iniesta (Spain)', category: 'Football (Soccer)' },
        { id: 'football-14', name: 'Erling Haaland (Norway)', category: 'Football (Soccer)' },
        { id: 'football-15', name: 'Antoine Griezmann (France)', category: 'Football (Soccer)' },
        { id: 'basketball-1', name: 'Michael Jordan (USA)', category: 'Basketball' },
        { id: 'basketball-2', name: 'LeBron James (USA)', category: 'Basketball' },
        { id: 'basketball-3', name: 'Kobe Bryant (USA)', category: 'Basketball' },
        { id: 'basketball-4', name: 'Stephen Curry (USA)', category: 'Basketball' },
        { id: 'basketball-5', name: 'Shaquille O’Neal (USA)', category: 'Basketball' },
        { id: 'basketball-6', name: 'Giannis Antetokounmpo (Greece)', category: 'Basketball' },
        { id: 'basketball-7', name: 'Dirk Nowitzki (Germany)', category: 'Basketball' },
        { id: 'basketball-8', name: 'Magic Johnson (USA)', category: 'Basketball' },
        { id: 'basketball-9', name: 'Larry Bird (USA)', category: 'Basketball' },
        { id: 'basketball-10', name: 'Kevin Durant (USA)', category: 'Basketball' },
        { id: 'basketball-11', name: 'Dražen Petrović (Croatia)', category: 'Basketball' },
        { id: 'basketball-12', name: 'Luka Dončić (Slovenia)', category: 'Basketball' },
        { id: 'basketball-13', name: 'Sue Bird (USA)', category: 'Basketball' },
        { id: 'basketball-14', name: 'Candace Parker (USA)', category: 'Basketball' },
        { id: 'tennis-1', name: 'Serena Williams (USA)', category: 'Tennis' },
        { id: 'tennis-2', name: 'Roger Federer (Switzerland)', category: 'Tennis' },
        { id: 'tennis-3', name: 'Rafael Nadal (Spain)', category: 'Tennis' },
        { id: 'tennis-4', name: 'Novak Djokovic (Serbia)', category: 'Tennis' },
        { id: 'tennis-5', name: 'Steffi Graf (Germany)', category: 'Tennis' },
        { id: 'tennis-6', name: 'Iga Świątek (Poland)', category: 'Tennis' },
        { id: 'tennis-7', name: 'Andy Murray (UK)', category: 'Tennis' },
        { id: 'tennis-8', name: 'Venus Williams (USA)', category: 'Tennis' },
        { id: 'tennis-9', name: 'Naomi Osaka (Japan)', category: 'Tennis' },
        { id: 'tennis-10', name: 'Carlos Alcaraz (Spain)', category: 'Tennis' },
        { id: 'tennis-11', name: 'Ashleigh Barty (Australia)', category: 'Tennis' },
        { id: 'tennis-12', name: 'Pete Sampras (USA)', category: 'Tennis' },
        { id: 'tennis-13', name: 'Martina Navratilova (Czech–USA)', category: 'Tennis' },
        { id: 'tennis-14', name: 'Björn Borg (Sweden)', category: 'Tennis' },
        { id: 'athletics-1', name: 'Usain Bolt (Jamaica)', category: 'Athletics (Track & Field)' },
        { id: 'athletics-2', name: 'Carl Lewis (USA)', category: 'Athletics (Track & Field)' },
        { id: 'athletics-3', name: 'Allyson Felix (USA)', category: 'Athletics (Track & Field)' },
        { id: 'athletics-4', name: 'Mo Farah (UK)', category: 'Athletics (Track & Field)' },
        { id: 'athletics-5', name: 'Florence Griffith-Joyner (USA)', category: 'Athletics (Track & Field)' },
        { id: 'athletics-6', name: 'Jessica Ennis-Hill (UK)', category: 'Athletics (Track & Field)' },
        { id: 'athletics-7', name: 'Eliud Kipchoge (Kenya)', category: 'Athletics (Track & Field)' },
        { id: 'athletics-8', name: 'Shelly-Ann Fraser-Pryce (Jamaica)', category: 'Athletics (Track & Field)' },
        { id: 'athletics-9', name: 'Cathy Freeman (Australia)', category: 'Athletics (Track & Field)' },
        { id: 'athletics-10', name: 'Ashton Eaton (USA)', category: 'Athletics (Track & Field)' },
        { id: 'athletics-11', name: 'Yulimar Rojas (Venezuela)', category: 'Athletics (Track & Field)' },
        { id: 'athletics-12', name: 'Wayde van Niekerk (South Africa)', category: 'Athletics (Track & Field)' },
        { id: 'athletics-13', name: 'Dafne Schippers (Netherlands)', category: 'Athletics (Track & Field)' },
        { id: 'combat-1', name: 'Muhammad Ali (USA)', category: 'Combat Sports (Boxing / MMA)' },
        { id: 'combat-2', name: 'Mike Tyson (USA)', category: 'Combat Sports (Boxing / MMA)' },
        { id: 'combat-3', name: 'Conor McGregor (Ireland)', category: 'Combat Sports (Boxing / MMA)' },
        { id: 'combat-4', name: 'Amanda Nunes (Brazil)', category: 'Combat Sports (Boxing / MMA)' },
        { id: 'combat-5', name: 'Ronda Rousey (USA)', category: 'Combat Sports (Boxing / MMA)' },
        { id: 'combat-6', name: 'Floyd Mayweather Jr. (USA)', category: 'Combat Sports (Boxing / MMA)' },
        { id: 'combat-7', name: 'Georges St-Pierre (Canada)', category: 'Combat Sports (Boxing / MMA)' },
        { id: 'combat-8', name: 'Anderson Silva (Brazil)', category: 'Combat Sports (Boxing / MMA)' },
        { id: 'combat-9', name: 'Israel Adesanya (New Zealand)', category: 'Combat Sports (Boxing / MMA)' },
        { id: 'combat-10', name: 'Valentina Shevchenko (Kyrgyzstan/Peru)', category: 'Combat Sports (Boxing / MMA)' },
        { id: 'combat-11', name: 'Canelo Álvarez (Mexico)', category: 'Combat Sports (Boxing / MMA)' },
        { id: 'combat-12', name: 'Holly Holm (USA)', category: 'Combat Sports (Boxing / MMA)' },
        { id: 'combat-13', name: 'Tyson Fury (UK)', category: 'Combat Sports (Boxing / MMA)' },
        { id: 'combat-14', name: 'Katie Taylor (Ireland)', category: 'Combat Sports (Boxing / MMA)' },
    ]
};

const customLegendsSlice = createSlice({
    name: 'customLegends',
    initialState,
    reducers: {
        addLegend: (state, action) => {
            state.legends.push(action.payload);
        },
        removeLegend: (state, action) => {
            state.legends = state.legends.filter((item) => item.id !== action.payload);
        },
    },
});

export const { addLegend, removeLegend } = customLegendsSlice.actions;
export const selectLegends = (state) => state.customLegends.legends;
export default customLegendsSlice.reducer;
