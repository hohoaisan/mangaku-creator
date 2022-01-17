import * as React from 'react';
import PropsType from 'prop-types';
import { useParams } from 'react-router-dom';
// material-ui
import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';

// react query
import { useMutation } from 'react-query';
import queryClient from 'query';
import { CHAPTERS } from 'query/queryKeys';
import { deleteComicChapter } from 'apis/chapter';

// toast
import ToastService from 'services/toast.service';
import strings from 'constants/strings';

const {
  buttons,
  pages: { chapter: chapterPageStrings }
} = strings;

const DeleteChapter = ({ open, onClose, selectedItem }) => {
  const { comicId } = useParams();
  const mutation = useMutation((chapterId) => deleteComicChapter(comicId, chapterId), {
    onMutate: async () => {},
    onSuccess: async () => {
      ToastService.destroyAll();
      ToastService.success(chapterPageStrings.mutations.deleteSuccess);
    },
    onSettled: () => {
      queryClient.invalidateQueries(CHAPTERS);
      onClose();
    }
  });
  const onSubmit = () => {
    mutation.mutate(selectedItem.id);
  };
  return (
    <Dialog open={open} onClose={onClose} disableEscapeKeyDown>
      <DialogTitle>{chapterPageStrings.delete}</DialogTitle>
      <DialogContent>
        {chapterPageStrings.prompt.deleteChapter} {selectedItem.number} - &quot;{selectedItem.name}&quot;
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

DeleteChapter.propTypes = {
  open: PropsType.bool,
  onClose: PropsType.func,
  selectedItem: PropsType.object
};

export default DeleteChapter;
