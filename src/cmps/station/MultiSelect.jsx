import { makeStyles } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { useState } from 'react';

const useStyles = makeStyles((theme) => ({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
      maxWidth: 300,
    },
    chips: {
      display: 'flex',
      flexWrap: 'wrap',
    },
    chip: {
      margin: 2,
    },
    noLabel: {
      marginTop: theme.spacing(3),
    },
  }));
  
  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
      },
    },
  };
  
  const tags = [
    'Pop',
    'Fun',
    'Retro',
    'Hip Hop',
    'Jazz',
    'Classic',
    'Dance',
    'Electro'
  ];
  
  
export const MultipleSelect = ({addTags}) => {
    const classes = useStyles();
    const [tagName, setTags] = useState([]);
  
    const handleChange = (event) => {
      setTags(event.target.value);
      addTags(event.target.value)
    };
  
    return (
      <div>
        <FormControl className={classes.formControl}>
          <InputLabel id="demo-mutiple-name-label">Name</InputLabel>
          <Select
            labelId="demo-mutiple-name-label"
            id="demo-mutiple-name"
            multiple
            value={tagName}
            onChange={handleChange}
            input={<Input />}
            MenuProps={MenuProps}
          >
            {tags.map((tag) => (
              <MenuItem key={tag} value={tag}>
                {tag}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>
    );
  }
  