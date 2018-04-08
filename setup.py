from setuptools import setup

setup(
    name="my_package",
    # (...)
    install_requires=[
        'pip >= 9.0.3',
        'setuptools >= 39.0.1'],
    extras_require={
        'tests': [],
        'docs': [
            'sphinx >= 1.7.2']}
)
