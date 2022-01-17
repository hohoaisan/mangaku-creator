import * as React from 'react';
import PropsType from 'prop-types';
// material-ui
import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';

// react query
import { useMutation } from 'react-query';
import queryClient from 'query';
import { COMICS } from 'query/queryKeys';
import { deleteAuthorComic } from 'apis/comicAuthor';

// toast
import ToastService from 'services/toast.service';
import strings from 'constants/strings';

const {
  buttons,
  pages: { comic: comicPageStrings }
} = strings;

const DeleteComic = ({ open, onClose, selectedItem }) => {
  const mutation = useMutation(deleteAuthorComic, {
    onMutate: async () => {},
    onSuccess: async () => {
      ToastService.destroyAll();
      ToastService.success(`${comicPageStrings.mutations.deleteSuccess} ${selectedItem.name}`);
    },
    onSettled: () => {
      queryClient.invalidateQueries(COMICS);
      onClose();
    }
  });
  const onSubmit = () => {
    mutation.mutate(selectedItem.id);
  };
  return (
    <Dialog open={open} onClose={onClose} disableEscapeKeyDown>
      <DialogTitle>{comicPageStrings.delete}</DialogTitle>
      <DialogContent>
        {comicPageStrings.prompt.deleteComic} &quot;{selectedItem.name}&quot;
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

DeleteComic.propTypes = {
  open: PropsType.bool,
  onClose: PropsType.func,
  selectedItem: PropsType.object
};

export default DeleteComic;
