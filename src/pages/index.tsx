import {useState} from 'react';

import {uuid} from 'uuidv4';

import firebase from '../helpers/firebase';
import {useCollection} from 'react-firebase-hooks/firestore';

import {
  Box,
  Button,
  Card,
  CardContent,
  FormControl,
  Input,
  InputLabel,
  Stack,
  Typography,
} from '@material-ui/core';

interface ListItem {
  id: string;
  content: string;
}

const Homepage = () => {
  // Subscribe to changes to the firestore
  const [value, loading, error] = useCollection(
    firebase.firestore().collection('items'),
    {snapshotListenOptions: {includeMetadataChanges: true}}
  );

  const [input, setInput] = useState<string>('');
  const [items, setItems] = useState<ListItem[]>([]);

  function addItem(item: ListItem) {
    // TODO: Add items to firebase instead
    setItems([...items, item]);
  }

  function removeItem(id: string) {
    // TODO: Remove items from firebase instead
    const newItems = items.filter(item => item.id !== id);
    setItems(newItems);
  }

  return (
    <main>
      {/* If there is an error, display the error message on screen */}
      {error && <strong>Error: {JSON.stringify(error)}</strong>}
      {/* If we are still waiting for data from firebase, display a loading message */}
      {loading && <span>Collection: Loading...</span>}
      {/* If we have a value loaded from firebase, we can display our app */}
      {value && (
        <>
          <div>
            <FormControl variant="standard" sx={{display: 'flex'}}>
              <Stack direction="row" sx={{width: '100%'}} spacing={4}>
                <div style={{width: '100%'}}>
                  <InputLabel htmlFor="inputAdd">Write an Item</InputLabel>
                  <Input
                    id="inputAdd"
                    sx={{width: '100%'}}
                    placeholder="Buy groceries"
                    type="text"
                    onInput={({target}) => {
                      const inputElem = target as HTMLInputElement;
                      const truncatedValue = inputElem.value.substring(0, 30);
                      setInput(truncatedValue);
                    }}
                  />
                </div>
                <Button
                  variant="contained"
                  id="btnAdd"
                  name="Add item"
                  onClick={() =>
                    addItem({
                      id: uuid(),
                      content: input,
                    })
                  }
                >
                  Add
                </Button>
              </Stack>
            </FormControl>
          </div>
          <Stack direction="column" spacing={4} sx={{marginTop: '2rem'}}>
            {items.map(({content, id}) => {
              return (
                <Card key={id}>
                  <CardContent>
                    <Box
                      sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignContent: 'center',
                      }}
                    >
                      <Typography sx={{marginY: 'auto'}}>{content}</Typography>
                      <Button
                        variant="contained"
                        color="error"
                        onClick={() => removeItem(id)}
                      >
                        Remove
                      </Button>
                    </Box>
                  </CardContent>
                </Card>
              );
            })}
          </Stack>
        </>
      )}
    </main>
  );
};

export default Homepage;
