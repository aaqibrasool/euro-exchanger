import React,{ useState } from 'react'
import {useNavigate} from 'react-router-dom'
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import * as api from '../../api/country'
import countryNames from '../../data/countryNames'
import Grid from '@mui/material/Grid';
import CountriesTable from '../../components/CountriesTable';

const Home = () => {
    const [countries, setCountries] = useState([])
    const [searchCountry, setSearchCountry] = useState('')
    const [amount,setAmount] = useState(1)
    const navigate = useNavigate()
  
    const addCountry = async () => {
      if(searchCountry === '') return
      const countryAlreadyExists = countries.find(country => country.name === searchCountry)
      if (countryAlreadyExists) {
        alert("Country Already Exists")
        setSearchCountry('')
        return
      }
      try {
        const {data} = await api.searchCountry(searchCountry)
        setCountries(prevCountries => [...prevCountries, data])
        setSearchCountry('')
      } catch (error) {
        navigate('/login')
      }
    }

    return (
      <Container maxWidth='lg' sx={{m:'3rem auto'}}>
        <Grid container spacing={4} alignItems="center">
          <Grid item xs={6}>
            <Autocomplete
                value={searchCountry}
                onChange={(event, newValue) => {
                  setSearchCountry(newValue);
                }}
                
                id="controllable-states-demo"
                options={countryNames}
                renderInput={(params) => <TextField {...params} label="Enter Country" />}
              />
          </Grid>
            <Grid item xs={2}>
              <Button variant="contained" onClick={addCountry} disabled={!searchCountry}>Add A New Country</Button>
            </Grid>
            <Grid item xs={4}>
              <TextField 
                label='enter amount in euros' 
                value={amount} 
                onChange={ e => setAmount(e.target.value)} 
                type='number' 
              />
          </Grid>
        </Grid>
        <CountriesTable countries={countries} amount={amount} />
      </Container>
    )
}

export default Home
