export interface IGlobalState {
   countries: IAllCountries
}

export interface IAllCountries {
   countries: ICountry[]
   status: 'idle' | 'loading' | 'succeeded' | 'failed'
   error: null | string | undefined
}

export interface ICountry {
   population: number
   name: {common: string}
   flags: {png: string}
   region: string
   capital: string[]
}