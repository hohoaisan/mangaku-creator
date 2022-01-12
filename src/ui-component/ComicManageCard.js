import React from 'react';
import { IconButton, Stack, CardMedia, Box, ButtonBase, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { Delete as DeleteIcon, Edit as EditIcon, Restore as RestoreIcon } from '@mui/icons-material';
import PropsType from 'prop-types';

import ApprovalStatus from './ApprovalStatus';
import { statusEnum } from 'constants/approvalStatus';

const useStyles = makeStyles((theme) => ({
  root: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    borderWidth: 1,
    borderColor: 'gray',
    borderStyle: 'solid',
    display: 'flex',
    flexDirection: 'row',
    cursor: 'pointer'
  },
  icon: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonRoot: {
    backgroundColor: '#FFFFFF'
  },
  title: {
    fontWeight: 'bold',
    display: 'block',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    lineHeight: '1.5em',
    height: '3em',
    textAlign: 'left'
  },
  author: {
    display: 'block',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    lineHeight: '1.66em',
    height: '1.66em',
    minWidth: 0
  },
  description: {
    display: 'block',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    lineHeight: '1.66em',
    height: '3.32em',
    textAlign: 'left'
  }
}));

const ComicManageCard = ({
  onClick,
  title,
  description,
  url,
  authors,
  approval,
  rating,
  numFavorites,
  createdAt,
  updatedAt,
  deletedAt,
  onDelete,
  onUpdate,
  onRestore,
  ...props
}) => {
  const classes = useStyles();
  return (
    <Box className={classes.root} {...props}>
      <ButtonBase onClick={onClick} sx={{ flex: 1 }}>
        <CardMedia
          component="img"
          sx={(theme) => ({
            width: 70,
            height: 100,
            [theme.breakpoints.up('md')]: {
              width: 100,
              height: 120
            },
            [theme.breakpoints.up('lg')]: {
              width: 120,
              height: 160
            }
          })}
          image={url}
          alt="Live from space album cover"
        />
        <Box padding={1} sx={{ flex: 1, minWidth: 0 }}>
          <Typography component="p" className={classes.title}>
            {title}
          </Typography>
          <Stack direction="row" mb={0.1}>
            <Typography variant="caption" fontWeight="bold" mr={1}>
              Author(s):
            </Typography>
            <Typography variant="caption" className={classes.author}>
              {authors?.length && authors.map(({ name }, index) => `${name}${index === authors.length - 1 ? '' : ', '}`)}
            </Typography>
          </Stack>
          <Stack direction="row" mb={0.1} flexWrap="wrap">
            <Typography variant="caption" fontWeight="bold" mr={1}>
              Approval:
            </Typography>
            <ApprovalStatus approval={approval} />
          </Stack>
          <Stack direction="row" mb={0.1} flexWrap="wrap">
            <Stack direction="row" mr={2} flexWrap="wrap">
              <Typography variant="caption" fontWeight="bold" mr={1}>
                Rating:
              </Typography>
              <Typography variant="caption">{rating || 'N/A'}</Typography>
            </Stack>
            <Stack direction="row" mb={0.1} flexWrap="wrap">
              <Typography variant="caption" fontWeight="bold" mr={1}>
                Favorite(s):
              </Typography>
              <Typography variant="caption">{numFavorites || 'N/A'}</Typography>
            </Stack>
          </Stack>
          <Stack direction="row" mb={0.1} flexWrap="wrap">
            {deletedAt ? (
              <Stack direction="row" flexWrap="wrap">
                <Typography variant="caption" fontWeight="bold" mr={1}>
                  Deleted at
                </Typography>
                <Typography variant="caption">
                  {`${new Date(deletedAt).toLocaleTimeString()} ${new Date(deletedAt).toLocaleDateString()}`}
                </Typography>
              </Stack>
            ) : (
              <>
                {createdAt && (
                  <Stack direction="row" mr={2} flexWrap="wrap">
                    <Typography variant="caption" fontWeight="bold" mr={1}>
                      Created at
                    </Typography>
                    <Typography variant="caption">{new Date(createdAt).toLocaleDateString()}</Typography>
                  </Stack>
                )}
                {updatedAt && updatedAt !== createdAt && (
                  <Stack direction="row" mr={2} flexWrap="wrap">
                    <Typography variant="caption" fontWeight="bold" mr={1}>
                      Updated at
                    </Typography>
                    <Typography variant="caption">{new Date(updatedAt).toLocaleDateString()}</Typography>
                  </Stack>
                )}
              </>
            )}
          </Stack>

          <Typography variant="caption" color="text.secondary" component="span" className={classes.description}>
            {description}
          </Typography>
        </Box>
      </ButtonBase>

      <Stack direction="column">
        {deletedAt ? (
          <IconButton color="default" size="small" onClick={onRestore}>
            <RestoreIcon />
          </IconButton>
        ) : (
          <>
            {approval === statusEnum.REJECTED || (
              <IconButton color="default" size="small" onClick={onUpdate}>
                <EditIcon />
              </IconButton>
            )}
            <IconButton color="default" size="small" onClick={onDelete}>
              <DeleteIcon />
            </IconButton>
          </>
        )}
      </Stack>
    </Box>
  );
};

ComicManageCard.propTypes = {
  onClick: PropsType.func,
  title: PropsType.string,
  description: PropsType.string,
  url: PropsType.string,
  authors: PropsType.array,
  approval: PropsType.string,
  rating: PropsType.number,
  numFavorites: PropsType.number,
  createdAt: PropsType.string,
  updatedAt: PropsType.string,
  deletedAt: PropsType.string,
  onDelete: PropsType.func,
  onUpdate: PropsType.func,
  onRestore: PropsType.func
};

export default ComicManageCard;
