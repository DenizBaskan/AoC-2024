from itertools import product

# ultimate bruteforce

with open("inputs/7.txt") as f:
    data = [line.split(": ") for line in f.readlines()]

def compute(p2):
    total = 0

    for (test, nums) in data:
        test = int(test)
        nums = [int(v) for v in nums.split(" ")]

        for c in list(product(["*", "+"] if not p2 else ["*", "+", "||"], repeat=(len(nums) - 1))):
            equ = nums[0]

            for i, num in enumerate(nums[1:]):
                if c[i] == "*":
                    equ *= num
                elif c[i] == "+":
                    equ += num
                else:
                    equ = int(str(equ) + str(num))

            if equ == test:
                total += equ
                break

    return total

print(compute(False))
print(compute(True)) # only takes 11s
