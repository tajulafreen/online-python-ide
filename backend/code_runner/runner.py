# Read input
with open("input.txt") as f:
    user_input = f.read()

# Read code
with open("code.py") as f:
    code = f.read()

# Setup input redirection
import sys
from io import StringIO
sys.stdin = StringIO(user_input)

# Execute code
exec(code)
