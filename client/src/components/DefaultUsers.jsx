import React, { useEffect, useState } from 'react'
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';
import users from '../data/users'

const DefaultUsers = ({loadDefaultUser}) => {
    const [checked,setChecked] = useState('')

    const handleToggle = (value) => () => {
        const currentIndex = checked.indexOf(value);
        const newChecked = [];

        if (currentIndex === -1) {
          newChecked.push(value);
        } else {
          newChecked.splice(currentIndex, 1);
        }
        
        setChecked(newChecked);
    };

    useEffect(()=>{
        if(!checked) return
        loadDefaultUser(checked[0].email,'12341234')
    },[checked,loadDefaultUser])

    return (
        <>
            <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
                {users.map((user) => {
                    const labelId = `checkbox-list-label-${user}`;

                    return (
                    <ListItem
                        key={user.id}
                        disablePadding
                    >
                        <ListItemButton role={undefined} onClick={handleToggle(user)} dense>
                        <ListItemIcon>
                            <Checkbox
                            edge="start"
                            checked={checked.indexOf(user) !== -1}
                            tabIndex={-1}
                            disableRipple
                            inputProps={{ 'aria-labelledby': labelId }}
                            />
                        </ListItemIcon>
                        <ListItemText id={labelId} primary={`${user.email}`} />
                        </ListItemButton>
                    </ListItem>
                    );
                })}
            </List>  
        </>
    )
}

export default DefaultUsers
