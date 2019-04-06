#!/bin/bash

SCRIPT_DIR="$(dirname "$0")";
SCRIPT_DIR="$(cd "$SCRIPT_DIR" && pwd)";

if [ ! -e "$SCRIPT_DIR/py3env/bin/pip3" ]; then
    virtualenv -p "$(which python3)" "$SCRIPT_DIR/py3env";
    export PATH=$SCRIPT_DIR/py3env/bin:$PATH ;
    pip install --upgrade pip setuptools ;
    pip install --upgrade -r "$SCRIPT_DIR/requirements.txt" ;
fi

echo "#!/bin/bash
export PATH=$SCRIPT_DIR/py3env/bin:\$PATH ;
    " > $SCRIPT_DIR/py3env/source.sh ;

