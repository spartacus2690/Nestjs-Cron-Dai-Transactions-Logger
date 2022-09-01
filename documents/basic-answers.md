**A)** For sorting an array of 11 numbers less than 100, I chose an implementation of the quick sort algorithm using [Hoare's partition scheme.](https://en.wikipedia.org/wiki/Quicksort#Hoare_partition_scheme) 

Compared to merge sort, it doesn't require creating extra space and sorts the array in place. This implementation of quick sort is unstable, but in this case it is not important because we are sorting only numbers. 

Benchmarking this against a merge sort implementation it seemed to be about 15 times faster on average.

Having an average time complexity of O(11log(11)), running this algorithm on my laptop with an Intel i7-10875H CPU it took an average 10 seconds to run 10^8 times. So we can assume it would take about 1000 seconds or approximately 16.66 mins to sort 10^10 arrays of 11 numbers less than 100.

Quicksort time/space complexities:

| Best Time Complexity | Average Time Complexity | Worst Time Complexity | Wost Space Complexity |
| -------------------- | ----------------------- | --------------------- | --------------------- |
| O(nlog(n))           | O(nlog(n))              | O(n^2)                | O(log(n))             |

Algorithm:

```js
const swap = (arr, index1, index2) => {
  const temp = arr[index1];
  arr[index1] = arr[index2];
  arr[index2] = temp;
};

const partition = (arr, low, high) => {
  const pivot = arr[high];
  let i = low - 1;
  for (let j = low; j <= high - 1; j++) {
    if (arr[j] <= pivot) {
      swap(arr, ++i, j);
    }
  }
  swap(arr, i + 1, high);
  return i + 1;
};

const quickSort = (arr, low, high) => {
  if (low < high) {
    const partitionIndex = partition(arr, low, high);
    quickSort(arr, low, partitionIndex - 1);
    quickSort(arr, partitionIndex + 1, high);
  }
};

const arr = [7, 32, 92, 87, 33, 6,  2, 25, 24, 98, 61];
//leaving original array unaffected
const sortedArr = quickSort([...arr], 0, arr.length - 1)
//modifying original array
quickSort(arr, 0, arr.length - 1)


```

**B)**

I made the original code more readable using async/await syntax. I also added a try/catch block assuming we'd want to handle the possibility of any errors.

In the original code, the resolved promise of `connectToDatabase()` would be the result of `notifyAdmins("USER_ROLE_UPDATED")`. This is not being used so I'm assuming there is no need to return anything.

The `getUserSettings(database, user.id)` call seems to be redundant because its result is not being used.

I used `Promise.all` to notify the user and the admins at the same time instead of waiting for the user notification to finish before notifying admins to increase execution speed.

I think it may be beneficial to re-factor the `notifyUser` function to tell the user which new role they were given.

Same thing for `notifyAdmins`, it may be useful to include which user was updated, and what role they were given.

If notifying users/admins is a must, we could use a db transaction to undo updating the user's role if either of the notification calls fail.

```js
(async () => {
    try{
        const db = await connectToDatabase();
        const user = await getUser(db, 'email@email.com');
        await setRole(db, user.id, "ADMIN");
        await Promise.all([
            notifyUser(user.id, "USER_ROLE_UPDATED"),
            notifyAdmins("USER_ROLE_UPDATED")
        ])
    }catch(err){
        // handle possible errors here
    }
})()
```

