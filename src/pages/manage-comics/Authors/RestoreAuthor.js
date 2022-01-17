import * as React from 'react';
import PropsType from 'prop-types';
// material-ui
import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';

// react query
import { useMutation } from 'react-query';
import queryClient from 'query';
import { AUTHORS } from 'query/queryKeys';
import { restoreAuthor } from 'apis/author';

// toast
import ToastService from 'services/toast.service';
import getAPIErrorMessage from 'utils/getAPIErrorMessage';
import strings from 'constants/strings';

const {
  pages: { author: authorPageStrings },
  buttons
} = strings;

const RestoreAuthor = ({ open, onClose, selectedItem }) => {
  const mutation = useMutation(restoreAuthor, {
    onMutate: async () => {},
    onError: async (err) => {
      ToastService.destroyAll();
      const message = getAPIErrorMessage(err);
      ToastService.success(`${authorPageStrings.mutations.restoreFailed} ${selectedItem.name}, reason: ${message}`);
    },
    onSuccess: async () => {
      ToastService.destroyAll();
      ToastService.success(`${authorPageStrings.mutations.restoreSuccess} ${selectedItem.name}`);
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
      <DialogTitle>{authorPageStrings.restore}</DialogTitle>
      <DialogContent>
        {authorPageStrings.prompt.restoreAuthor} &quot;{selectedItem.name}&quot;
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

RestoreAuthor.propTypes = {
  open: PropsType.bool,
  onClose: PropsType.func,
  selectedItem: PropsType.object
};

export default RestoreAuthor;
