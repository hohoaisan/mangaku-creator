import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import { InputBase, IconButton } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';

const Wrapper = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.black, 0.1),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.black, 0.1)
  },
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto'
  }
}));

const StyledIconWrapper = styled('div')(({ theme }) => ({
  position: 'absolute',
  marginRight: '0.5em',
  height: '100%',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  right: 0,
  top: 0
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 1),
    // vertical padding + font size from searchIcon
    paddingRight: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '12ch',
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch'
      }
    }
  }
}));

const Search = ({ onSubmit, ...props }) => {
  const [isSubmit, setIsSubmit] = React.useState(false);
  const inputRef = React.useRef(null);
  const onFormSubmit = (event) => {
    event.preventDefault();
    if (inputRef.current.value) {
      setIsSubmit(true);
      onSubmit(inputRef.current.value);
    }
  };
  const onClose = () => {
    setIsSubmit(false);
    onSubmit(null);
  };
  return (
    <Wrapper>
      <form onSubmit={onFormSubmit}>
        <StyledInputBase inputRef={inputRef} placeholder="Search…" {...props} inputProps={{ 'aria-label': 'search' }} />
      </form>
      <StyledIconWrapper>
        <IconButton size="small" onClick={isSubmit ? onClose : onFormSubmit}>
          {isSubmit ? <CloseIcon /> : <SearchIcon />}
        </IconButton>
      </StyledIconWrapper>
    </Wrapper>
  );
};

export default Search;
