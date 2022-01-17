import * as React from 'react';
import PropsType from 'prop-types';
// material-ui
import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';

// react query
import { useMutation } from 'react-query';
import queryClient from 'query';
import { COMICS } from 'query/queryKeys';
import { restoreComic } from 'apis/comic';

// toast
import ToastService from 'services/toast.service';
import getAPIErrorMessage from 'utils/getAPIErrorMessage';
import strings from 'constants/strings';

const {
  buttons,
  pages: { comic: comicPageStrings }
} = strings;

const RestoreComic = ({ open, onClose, selectedItem }) => {
  const mutation = useMutation(restoreComic, {
    onMutate: async () => {},
    onError: async (err) => {
      ToastService.destroyAll();
      const message = getAPIErrorMessage(err);
      ToastService.error(`${comicPageStrings.mutations.restoreFailed} ${selectedItem.name}: ${message}`);
    },
    onSuccess: async () => {
      ToastService.destroyAll();
      ToastService.success(`${comicPageStrings.mutations.restoreSuccess} ${selectedItem.name}`);
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
      <DialogTitle>{comicPageStrings.restore}</DialogTitle>
      <DialogContent>
        {comicPageStrings.prompt.restoreComic} &quot;{selectedItem.name}&quot;
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

RestoreComic.propTypes = {
  open: PropsType.bool,
  onClose: PropsType.func,
  selectedItem: PropsType.object
};

export default RestoreComic;
