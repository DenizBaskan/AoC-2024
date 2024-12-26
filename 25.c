#include <stdlib.h>
#include <stdio.h>

#define BLOCK_LEN (6 * 7) + 1

void main()
{
    char block[BLOCK_LEN];
    size_t bytes;
    int keys[512][5] = {0}, locks[512][5] = {0};
    int keys_i, locks_i = 0;

    while ((bytes = fread(block, 1, BLOCK_LEN, stdin))) {
        block[bytes] = 0;

        for (int j = 0; j < 5; j++) {
            int count = 0;

            for (int i = 0; i < 7; i++) {
                if (block[j + (i * 6)] == '#') count++;
            }

            block[0] == '.' ? (keys[keys_i][j] = count) : (locks[locks_i][j] = count);
        }

        block[0] == '.' ? keys_i++ : locks_i++;
    }

    int pairs = 0;

    for (int i = 0; i < keys_i; i++) {
        for (int j = 0; j < locks_i; j++) {
            int count = 0;

            for (int k = 0; k < 5; k++) {
                if ((keys[i][k] + locks[j][k]) <= 7) count++;
            }

            if (count == 5) pairs++;
        }
    }

    printf("%d\n", pairs);
}
