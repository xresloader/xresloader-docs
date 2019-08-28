#!/bin/bash

SCRIPT_DIR="$(dirname "$0")";
SCRIPT_DIR="$(cd "$SCRIPT_DIR" && pwd)";

# PATH for editor ${workspaceFolder}/py3env/bin

if [ ! -e "$SCRIPT_DIR/py3env/bin/pip3" ]; then
    python3 -m pip install virtualenv;
    python3 -m virtualenv -p "$(which python3)" "$SCRIPT_DIR/py3env";
fi

export PATH=$SCRIPT_DIR/py3env/bin:$PATH ;
pip install --upgrade -r "$SCRIPT_DIR/requirements-vscode.txt" ;
pip install --upgrade -r "$SCRIPT_DIR/requirements.txt" ;

echo "#!/bin/bash

export PATH=\"$SCRIPT_DIR/py3env/bin:\$PATH\" ;

\"\$@\"
    " > "$SCRIPT_DIR/py3env/source.sh" ;

chmod +x "$SCRIPT_DIR/py3env/source.sh" ;

