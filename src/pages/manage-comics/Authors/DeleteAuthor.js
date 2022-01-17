import * as React from 'react';
import PropsType from 'prop-types';
// material-ui
import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';

// react query
import { useMutation } from 'react-query';
import queryClient from 'query';
import { AUTHORS } from 'query/queryKeys';
import { deleteAuthor } from 'apis/author';

// toast
import ToastService from 'services/toast.service';
import strings from 'constants/strings';
import getAPIErrorMessage from 'utils/getAPIErrorMessage';

const {
  pages: { author: authorPageStrings },
  buttons
} = strings;

const DeleteAuthor = ({ open, onClose, selectedItem }) => {
  const mutation = useMutation(deleteAuthor, {
    onMutate: async () => {},
    onSuccess: async () => {
      ToastService.destroyAll();
      ToastService.success(`${authorPageStrings.mutations.deleteSuccess} ${selectedItem.name}`);
    },
    onError: async (err) => {
      const message = getAPIErrorMessage(err);
      ToastService.error(message);
    },
    onSettled: () => {
      queryClient.invalidateQueries(AUTHORS);
      onClose();
    }
  });
  const onSubmit = () => {
    mutation.mutate(selectedItem.id);
  };
  return (
    <Dialog open={open} onClose={onClose} disableEscapeKeyDown>
      <DialogTitle>{authorPageStrings.delete}</DialogTitle>
      <DialogContent>
        {authorPageStrings.prompt.deleteAuthor} &quot;{selectedItem.name}&quot;
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} disabled={mutation.isLoading}>
          {buttons.cancel}
        </Button>
        <Button onClick={onSubmit} disabled={mutation.isLoading}>
          {buttons.confirm}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

DeleteAuthor.propTypes = {
  open: PropsType.bool,
  onClose: PropsType.func,
  selectedItem: PropsType.object
};

export default DeleteAuthor;
