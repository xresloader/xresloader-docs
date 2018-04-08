from setuptools import setup

setup(
    name="xresloader-docs",
    # (...)
    install_requires=[],
    extras_require={
        'tests': [],
        'docs': [
            'pip >= 9.0.3',
            'setuptools >= 39.0.1',
            'sphinx >= 1.7.2']
        }
)
