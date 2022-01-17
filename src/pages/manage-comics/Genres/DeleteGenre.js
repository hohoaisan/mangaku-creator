import * as React from 'react';
import PropsType from 'prop-types';
// material-ui
import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';

// react query
import { useMutation } from 'react-query';
import queryClient from 'query';
import { GENRES } from 'query/queryKeys';
import { deleteGenre } from 'apis/genre';

// toast
import ToastService from 'services/toast.service';

import strings from 'constants/strings';
import getAPIErrorMessage from 'utils/getAPIErrorMessage';

const {
  buttons,
  pages: { genre: genrePageStrings }
} = strings;

const DeleteGenre = ({ open, onClose, selectedItem }) => {
  const mutation = useMutation(deleteGenre, {
    onMutate: async () => {},
    onSuccess: async () => {
      ToastService.destroyAll();
      ToastService.success(`${genrePageStrings.mutations.deleteSuccess} ${selectedItem.name}`);
    },
    onError: (err) => {
      const message = getAPIErrorMessage(err);
      ToastService.error(message);
    },

    onSettled: () => {
      queryClient.invalidateQueries(GENRES);
      onClose();
    }
  });
  const onSubmit = () => {
    mutation.mutate(selectedItem.id);
  };
  return (
    <Dialog open={open} onClose={mutation.isLoading ? undefined : onClose} disableEscapeKeyDown>
      <DialogTitle>{genrePageStrings.delete}</DialogTitle>
      <DialogContent>
        {genrePageStrings.prompt.deleteAuthor} &quot;{selectedItem.name}&quot;
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} disabled={mutation.isLoading}>
          {buttons.close}
        </Button>
        <Button onClick={onSubmit} disabled={mutation.isLoading}>
          {buttons.confirm}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

DeleteGenre.propTypes = {
  open: PropsType.bool,
  onClose: PropsType.func,
  selectedItem: PropsType.object
};

export default DeleteGenre;
