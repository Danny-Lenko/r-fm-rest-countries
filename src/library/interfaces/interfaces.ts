export interface IGlobalState {
   countries: IAllCountries
}

export interface IAllCountries {
   countries: ICountry[]
   status: 'idle' | 'loading' | 'succeeded' | 'failed'
   error: null | string | undefined
   region: null | string
   searchQuery: null | string
}

export interface ICountry {
   population: number
   name: {common: string, nativeName: Record<string, any>}
   flags: {png: string}
   region: string
   capital: string[]
   subregion: string
   tld: string
   currencies: Record<string, any>
   languages: Record<string, any>
   borders: string[]
   cca3: string
}