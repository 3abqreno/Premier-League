import pytest

def test_addition():
    assert 2 + 2 == 4

def test_subtraction():
    assert 5 - 3 == 2

def test_multiplication():
    assert 3 * 3 == 9

def test_division():
    assert 10 / 2 == 5

def test_modulus():
    assert 10 % 3 == 1
    
def test_wrong:
    assert 1 == 2